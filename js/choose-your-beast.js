class BeastSelector {
    constructor() {
      this.beast1 = document.getElementById("beast1");
      this.beast2 = document.getElementById("beast2");
      this.beast3 = document.getElementById("beast3");
      this.beast4 = document.getElementById("beast4");
  
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.beast1.addEventListener("click", () => this.selectBeast("beast1"));
      this.beast2.addEventListener("click", () => this.selectBeast("beast2"));
      this.beast3.addEventListener("click", () => this.selectBeast("beast3"));
      this.beast4.addEventListener("click", () => this.selectBeast("beast4"));
    }
  
    selectBeast(beast) {
      window.location.href = `level1.html?beast=${beast}`;
    }
  }
  
  const beastSelector = new BeastSelector();
  
