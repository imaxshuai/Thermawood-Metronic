export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pages',
					'root': true,
					'icon-': 'flaticon-add',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'alignment': 'left',
					submenu: []
				},
				{
					'title': 'Features',
					'root': true,
					'icon-': 'flaticon-line-graph',
					'toggle': 'click',
					'alignment': 'left',
					submenu: []
				},
				{
					'title': 'Apps',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'alignment': 'left',
					submenu: []
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'All Quotes',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				}
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
