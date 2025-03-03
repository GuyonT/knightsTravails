class ListNode {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    let newNode = new ListNode(value);
    console.log(newNode);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
      this.size++;
    }
  }

  prepend(value) {
    let newNode = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
      this.size++;
    }
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    return this.tail.value;
  }

  at(index) {
    if (this.head === null || index < 0) {
      return null;
    }

    let currentNode = this.head;
    let i = 0;

    while (i < index && currentNode !== null) {
      currentNode = currentNode.nextNode;
      i++;
    }

    if (currentNode === null) {
      return null;
    } else {
      return currentNode.value;
    }
  }

  pop() {
    if (this.head === null) {
      console.log("The list is already empty");
    } else if (this.head === this.tail) {
      this.head = this.tail = null;
      this.size = 0;
    } else {
      let currentNode = this.head;
      while (currentNode.nextNode !== this.tail) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = null;
      this.tail = currentNode;
      this.size--;
    }
  }

  contains(value) {
    if (this.head === null) {
      console.log("The list is empty");
      return false;
    }
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    }
    return false;
  }

  find(value) {
    if (this.head === null) {
      console.log("The list is empty");
      return null;
    }
    let currentNode = this.head;
    let i = 0;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return i;
      } else {
        currentNode = currentNode.nextNode;
        i++;
      }
    }
    return null;
  }

  toString() {
    let string = "";
    if (this.head === null) {
      console.log("The list is empty");
      string += `No items `;
      return string;
    }
    let currentNode = this.head;
    while (currentNode !== null) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    string += `null`;
    return string;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size) {
      console.log("out of bounds");
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    } else if (index === this.size) {
      this.append(value);
      return;
    }

    let currentNode = this.head;
    let i = 0;

    while (i < index - 1) {
      currentNode = currentNode.nextNode;
      i++;
    }

    let previousNode = currentNode;
    let newNode = new ListNode(value);

    newNode.nextNode = previousNode.nextNode;
    previousNode.nextNode = newNode;
    this.size++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) {
      console.log("out of bounds");
      return;
    } else if (index === 0) {
      this.head = this.head.nextNode;
      this.size--;
      return;
    }

    if (index === this.size - 1) {
      this.pop();
      return;
    }

    let currentNode = this.head;
    let i = 0;
    while (i < index - 1) {
      currentNode = currentNode.nextNode;
      i++;
    }

    let previousNode = currentNode;
    let nextNode = currentNode.nextNode.nextNode;

    previousNode.nextNode = nextNode;
    this.size--;
  }
}

let list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("horse");
list.prepend("snake");
console.log(list.toString());
