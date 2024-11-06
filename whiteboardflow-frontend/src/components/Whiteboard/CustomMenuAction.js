export default class CustomMenuAction extends window.iink.OIMenuAction {
    constructor(editor) {
        super(editor);
        this.menuIntention = new window.iink.OIMenuIntention(editor);
        this.menuStyle = new window.iink.OIMenuStyle(editor);
    }

    render(layer)
    {
        this.wrapper = document.createElement("div")
        this.wrapper.classList.add("ms-menu", "custom-menu-action")
        this.wrapper.appendChild(this.createMenuClear())
        this.wrapper.appendChild(this.createMenuUndo())
        this.wrapper.appendChild(this.createMenuRedo())
        this.wrapper.appendChild(this.menuIntention.createMenuWrite())
        this.wrapper.appendChild(this.menuIntention.createMenuErase())
        this.wrapper.appendChild(this.menuIntention.createMenuMove())
        this.wrapper.appendChild(this.menuStyle.createMenuStroke())
        this.wrapper.appendChild(this.menuStyle.createMenuFontSize())
        layer.appendChild(this.wrapper)
        this.show()
    }
}
