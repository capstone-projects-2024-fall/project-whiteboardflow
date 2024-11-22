export default class CustomMenuAction extends window.iink.OIMenuAction {
    constructor(editor) {
        super(editor);
        this.menuIntention = new window.iink.OIMenuIntention(editor);
        this.menuStyle = new window.iink.OIMenuStyle(editor);
        this.isExpanded = false;  // State to track if the menu is expanded or not
    }

    toggleMenu() {
        this.isExpanded = !this.isExpanded;
        this.expandableContent.style.width = this.isExpanded ? `${this.expandableContent.scrollWidth}px` : '0';
        this.toggleButton.textContent = this.isExpanded ? '\u2B9C' : '\u2B9E'; // Left arrow when expanded, right arrow when collapsed
    }

    render(layer) {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("ms-menu", "custom-menu-action");

        // Create a button to toggle the menu
        this.toggleButton = document.createElement('button');
        this.toggleButton.textContent = '\u2B9E';
        this.toggleButton.style.backgroundColor = 'white';
        this.toggleButton.style.border = 'none';
        this.toggleButton.style.color = '#1a9fff';
        this.toggleButton.onclick = () => this.toggleMenu();

        // Create a container for the items that will be shown/hidden
        this.expandableContent = document.createElement("div");
        this.expandableContent.classList.add('expandable-content');
        this.expandableContent.style.width = '0';  // Start collapsed
        this.expandableContent.style.overflow = 'hidden';
        this.expandableContent.style.transition = 'width 0.3s ease-out';
        this.expandableContent.style.display = 'flex';
        this.expandableContent.style.flexDirection = 'row';
        this.expandableContent.style.flexWrap = 'nowrap';
        this.expandableContent.style.justifyContent = 'space-between';
        // Elements that are always visible
        this.wrapper.appendChild(this.menuIntention.createMenuWrite());
        this.wrapper.appendChild(this.menuIntention.createMenuMove());
        this.wrapper.appendChild(this.menuIntention.createMenuErase());
        this.wrapper.appendChild(this.createMenuUndo());
        this.wrapper.appendChild(this.createMenuRedo());

        const menuStroke = this.menuStyle.createMenuStroke();
        menuStroke.style.width = '80px';

        const menuFontSize = this.menuStyle.createMenuFontSize();
        menuFontSize.style.width = '100px';

        this.expandableContent.appendChild(menuStroke);
        this.expandableContent.appendChild(menuFontSize);
        this.expandableContent.appendChild(this.createMenuClear());

        // Append the toggle button and the expandable content to the wrapper
        this.wrapper.appendChild(this.toggleButton);
        this.wrapper.appendChild(this.expandableContent);

        // Append the entire wrapper to the provided layer and show it
        layer.appendChild(this.wrapper);
        this.show();
    }
}
