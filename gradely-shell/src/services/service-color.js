class serviceColor {
  // PROFILE COLOR SET
  profile_colors = [
    {
      id: "A",
      value: "chestnut",
    },

    {
      id: "B",
      value: "pampers",
    },

    {
      id: "C",
      value: "cherry-tomato",
    },

    {
      id: "D",
      value: "aspen-gold",
    },

    {
      id: "E",
      value: "verdant-green",
    },

    {
      id: "F",
      value: "orange-shire",
    },

    {
      id: "G",
      value: "brand-inverse",
    },

    {
      id: "H",
      value: "toffee",
    },

    {
      id: "I",
      value: "pale-yellow",
    },

    {
      id: "J",
      value: "color-ash",
    },

    {
      id: "K",
      value: "navy-blue",
    },

    {
      id: "L",
      value: "forest-green",
    },

    {
      id: "M",
      value: "deep-blue",
    },

    {
      id: "N",
      value: "bright-red",
    },

    {
      id: "O",
      value: "crimson",
    },

    {
      id: "P",
      value: "royal-blue",
    },

    {
      id: "Q",
      value: "brand-accent",
    },

    {
      id: "R",
      value: "royal-blue",
    },

    {
      id: "S",
      value: "brand-blue",
    },

    {
      id: "T",
      value: "kelly-green",
    },

    {
      id: "U",
      value: "miami",
    },

    {
      id: "V",
      value: "deep-purple",
    },

    {
      id: "W",
      value: "windsor-wine",
    },

    {
      id: "X",
      value: "sprout",
    },

    {
      id: "Y",
      value: "slack",
    },

    {
      id: "Z",
      value: "fedex",
    },
  ];

  // SET PAGE BACKGROUND COLOR
  setPageBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  randomniseColors(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // GENERATE RANDOM COLORS
  generateRandomColors(color = this.profile_colors, max = 25, min = 1) {
    let color_list = color.sort(() => 0.5 - Math.random());
    return color_list[this.randomniseColors(max, min)].value + "-bg";
  }

  getProgressBarColor(progress) {
    if (+progress <= 45) return "brand-red";
    else if (+progress > 45 && +progress <= 75) return "brand-accent";
    else return "brand-green";
  }

  getProgressColor(progress) {
    if (+progress <= 45) return "#fe747d";
    else if (+progress > 45 && +progress <= 75) return "#faa017";
    else return "#00e29f";
  }

  // SET PROFILE BACKGROUND COLOR
  getProfileBgColor(string) {
    let initial_string = string.slice(0, 1).toUpperCase();
    let background_color;
    this.profile_colors.map((color) => {
      color.id === initial_string ? (background_color = color.value) : null;
    });
    return `${background_color}-bg`;
  }
}

export const $serviceColor = new serviceColor();
