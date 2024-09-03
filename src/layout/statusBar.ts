import VaultToBlog from "../../main";
import {Notice} from "obsidian";

export class StatusBar {
	private iconSrc = 'https://raw.githubusercontent.com/barkstone2/vault-to-blog/main/react-app/public/favicon.ico'
	constructor(private statusBarEl: HTMLElement, private readonly plugin: VaultToBlog) {
		statusBarEl.createEl('img', {cls: 'vtb-status-bar-icon', attr: {src: this.iconSrc}})
		statusBarEl.addClass('mod-clickable')
		statusBarEl.ariaLabel = 'Publish to GitHub Page.';
		statusBarEl.setAttribute("data-tooltip-position", "top");
		statusBarEl.onClickEvent(async () => {
			if (this.plugin.settings.isActivated) {
				this.plugin.publishBlog();
			} else {
				new Notice("Activate before publishing.")
			}
		})
	}

	activate() {
		this.statusBarEl.removeClass('vtb-grayscale')
	}

	deactivate() {
		this.statusBarEl.addClass('vtb-grayscale')
	}
}