const prompt = require("prompt-sync")();

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BST {
  constructor() {
    this.root = null;
  }

  // Helper function to calculate the height of a node
  height(node) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  // Helper function to perform a right rotation
  rotateRight(node) {
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    return newRoot;
  }

  // Helper function to perform a left rotation
  rotateLeft(node) {
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    return newRoot;
  }

  // Helper function to balance a node
  balance(node) {
    if (node === null) {
      return null;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (leftHeight - rightHeight > 1) {
      // Left subtree is taller
      if (this.height(node.left.left) >= this.height(node.left.right)) {
        // Perform a single right rotation
        node = this.rotateRight(node);
      } else {
        // Perform a left-right double rotation
        node.left = this.rotateLeft(node.left);
        node = this.rotateRight(node);
      }
    } else if (rightHeight - leftHeight > 1) {
      // Right subtree is taller
      if (this.height(node.right.right) >= this.height(node.right.left)) {
        // Perform a single left rotation
        node = this.rotateLeft(node);
      } else {
        // Perform a right-left double rotation
        node.right = this.rotateRight(node.right);
        node = this.rotateLeft(node);
      }
    }

    return node;
  }

  // Insert a value into the BST
  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (node === null) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }

    // Balance the tree after insertion
    return this.balance(node);
  }
  // Update the value of a node
  update(oldValue, newValue) {
    this.root = this.updateValue(this.root, oldValue, newValue);
  }

  updateValue(node, oldValue, newValue) {
    if (node === null) {
      return null;
    }

    if (oldValue < node.value) {
      node.left = this.updateValue(node.left, oldValue, newValue);
    } else if (oldValue > node.value) {
      node.right = this.updateValue(node.right, oldValue, newValue);
    } else {
      // Node with oldValue found, update its value
      node.value = newValue;
    }
    // Balance the tree after insertion
    return this.balance(node);
  }
  // Delete a value from the BST
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to delete found
      if (node.left === null && node.right === null) {
        // Case 1: Node has no children
        node = null;
      } else if (node.left === null) {
        // Case 2: Node has only right child
        node = node.right;
      } else if (node.right === null) {
        // Case 3: Node has only left child
        node = node.left;
      } else {
        // Case 4: Node has both left and right children
        const minNode = this.findMin(node.right);
        node.value = minNode.value;
        node.right = this.deleteNode(node.right, minNode.value);
      }
    }

    // Balance the tree after deletion
    return this.balance(node);
  }

  // Helper function to find the minimum value node in a subtree
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Inorder traversal for debugging (left, root, right)
  inorder() {
    this.inorderTraversal(this.root);
    console.log();
  }

  inorderTraversal(node) {
    if (node !== null) {
      this.inorderTraversal(node.left);
      process.stdout.write(node.value + " ");
      this.inorderTraversal(node.right);
    }
  }
}
function printLeftSubtree(node) {
  if (node !== null) {
    printLeftSubtree(node.left); // Recursively print left subtree
    console.log(node.value); // Print node value
  }
}
const bst = new BST();
while (true) {
  const valueStr = prompt(
    'Enter a value to insert (or type "exit" to finish): '
  );
  if (valueStr.toLowerCase() === "exit") {
    break;
  }
  const value = parseInt(valueStr);
  bst.insert(value);
  console.log("Inorder traversal After data Insertion: ");
  bst.inorder();
}

while (true) {
  const valueStr = prompt(
    'Enter a value to delete (or type "exit" to finish): '
  );
  if (valueStr.toLowerCase() === "exit") {
    break;
  }
  const value = parseInt(valueStr);
  bst.delete(value);
  console.log("Inorder traversal after delete: ");
  bst.inorder();
  break;
}
while (true) {
  const valueStr = prompt(
    'Enter a old value for update (or type "exit" to finish): '
  );
  const valueStr1 = prompt('Enter a new value (or type "exit" to finish): ');
  if (valueStr.toLowerCase() === "exit" || valueStr1.toLowerCase() === "exit") {
    break;
  }
  const value = parseInt(valueStr);
  const value1 = parseInt(valueStr1);
  bst.update(value, value1);
  console.log("Inorder traversal after update: ");
  bst.inorder();
  break;
}
// bst.update(15, 14);
// console.log("Inorder traversal after update: ");
// bst.inorder();
// this function print sub Tree
// console.log("Left subtree of root:");
// printLeftSubtree(bst.root.left);
