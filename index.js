/*  Dropdownify is a module to easily implement dropdown menus by simply adding a 'dropdownify' class to the container for each dropdown menu.
    Version: 1.0.0
    MIT License
    By: Matt Jordan (github: mmjordan11)
*/

// Factory function for dropdown menus
const Dropdown = (element) => {
  const _showMenu = () => {
    for (let i = 1; i < element.children.length; i++) {
      element.children[i].hidden = false;
    }
  };
  const _hideMenu = () => {
    for (let i = 1; i < element.children.length; i++) {
      element.children[i].hidden = true;
    }
  };
  const _setMenuPosition = () => {
    element.style.position = "relative";

    const getFirstChildPosition = (child) => {
      style = window.getComputedStyle(child);
      return (
        parseFloat(child.offsetHeight) +
        parseFloat(style.marginBottom.slice(0, -2))
      );
    };

    const getNextChildPosition = (topOfChild, child) => {
      style = window.getComputedStyle(child);
      return (
        topOfChild +
        parseFloat(child.offsetHeight) +
        parseFloat(style.marginTop.slice(0, -2)) +
        parseFloat(style.marginBottom.slice(0, -2))
      );
    };

    let top = getFirstChildPosition(element.children[0]);
    element.style.zIndex = "auto";

    for (let i = 1; i < element.children.length; i++) {
      let child = element.children[i];
      child.style.position = "absolute";
      child.style.top = `${top}px`;
      let firstChildZIndex = parseInt(
        window.getComputedStyle(element.children[0]).zIndex
      );
      console.log(firstChildZIndex);
      child.style.zIndex = (() => {
        if (Number.isNaN(1)) {
          if (Number.isNaN(firstChildZIndex)) {
            return 2;
          } else {
            return firstChildZIndex + 1;
          }
        } else if (Number.isNaN(firstChildZIndex)) {
          return 2;
        }
        return Math.max(elementZIndex, firstChildZIndex) + 1;
      })();
      top = getNextChildPosition(top, child);
    }
  };

  const getElement = () => element;
  const addHoverListener = () => {
    element.addEventListener("mouseenter", _showMenu);
    element.addEventListener("mouseleave", _hideMenu);
  };
  const removeHoverListener = () => {
    element.removeEventListener("mouseenter", _showMenu);
    element.removeEventListener("mouseleave", _hideMenu);
  };

  const init = (() => {
    _setMenuPosition();
    _hideMenu();
  })();

  return {
    getElement,
    addHoverListener,
    removeHoverListener,
  };
};

const dropdownify = (() => {
  const _dropdowns = [];

  const _createDropdownObjs = () => {
    let containers = document.querySelectorAll(".dropdownify");
    for (let container of containers) {
      _dropdowns.push(Dropdown(container));
    }
  };
  const addHoverDropdowns = () => {
    _dropdowns.forEach((dropdown) => dropdown.addHoverListener());
  };

  const removeHoverDropdowns = () => {
    _dropdowns.forEach((dropdown) => dropdown.removeHoverListener());
  };

  const _init = (() => {
    _createDropdownObjs();
    addHoverDropdowns();
    return true;
  })();

  return {
    addHoverDropdowns,
    removeHoverDropdowns,
  };
})();
