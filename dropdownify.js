/*  Dropdownify is a module to easily implement dropdown menus by simply adding a 'dropdownify' class to the container for each dropdown menu.
    Version: 1.0.0
    MIT License
    By: Matt Jordan (github: mmjordan11)
*/

const exports = (module.exports = {});

// Factory function for dropdown menus
const Dropdown = (element) => {
  const getElement = () => element;
  const _getMenu = () => element.querySelector(".dropdownify-content");

  // Set dropdown container styling
  const _setDropdownStyle = () => {
    const style = element.style;
    style.position = "relative";
    style.display = "inline-block";
    style.zIndex = "auto";
  };

  //Set dropdown menu styling
  const _setDropdownMenuStyle = () => {
    const menu = _getMenu();
    const style = menu.style;
    style.display = "none";
    style.position = "absolute";
    style.zIndex = 1;
  };

  // Assigns all but first contained HTML element to dropdown menu container div
  const _wrapMenu = () => {
    // Create wrapper for dropdown menu
    const wrapper = document.createElement("div");
    wrapper.classList.add("dropdownify-content");

    // Splices menu from dropdownify HTML element ignoring first element as header
    const menu = Array.from(element.children).splice(1);

    // Add wrapper element to dropdown container
    element.insertBefore(wrapper, element.children[1]);
    // Move menu elements into menu wrapper
    menu.forEach((element) => wrapper.appendChild(element));
    _setDropdownMenuStyle();
  };

  const _showMenu = () => {
    return (_getMenu().style.display = "block");
  };

  const _hideMenu = () => {
    return (_getMenu().style.display = "none");
  };

  const _addHoverListener = () => {
    element.addEventListener("mouseenter", _showMenu);
    element.addEventListener("mouseleave", _hideMenu);
  };

  // Runs all private functions to initialize dropdown
  const init = (() => {
    _setDropdownStyle();
    _wrapMenu();
    _addHoverListener();
  })();

  return {
    getElement,
  };
};

exports.dropdownify = (() => {
  //  Array to initialize and hold Dropdown objects for future use
  const _dropdowns = [];

  // Funtion to initialize and store all Dropdown objects
  const _createDropdownObjs = () => {
    let containers = document.querySelectorAll(".dropdownify");
    for (let container of containers) {
      _dropdowns.push(Dropdown(container));
    }
  };

  // Runs program on import
  const _init = (() => {
    _createDropdownObjs();
    return true;
  })();
})();
