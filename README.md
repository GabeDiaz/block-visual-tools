# Block Visual Tools for WordPress

A WordPress plugin that adds visual tools to the block editor for easier block debugging and development. This plugin works only in the block editor and does not affect the front end of your site.

## For Users: Plugin Installation

### Option 1: Direct Installation
1. Download the latest release zip file from the [Releases page](https://github.com/gabediaz/block-visual-tools/releases).
2. Go to WordPress Admin > Plugins > Add New > Upload Plugin.
3. Upload the zip file and activate the plugin.

### Option 2: Manual Server Installation
1. Clone the repository or download the zip file.
2. Ensure you run `npm install` and `npm run build` to generate the necessary files.
3. Upload the `block-visual-tools` folder to `/wp-content/plugins/`.
4. Activate through WordPress Admin > Plugins.

## Using the Plugin

1. Open any page or post in the WordPress editor.
2. Click on any block to select it.
3. Look in the right sidebar for "Visual Tools."
4. Use the available tools:
   - **Hide Block**: Temporarily hide blocks while editing.
   - **Show Block Structure**: Visualize block boundaries and nesting.

## For Developers: Setup & Build

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Local WordPress development environment

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/gabediaz/block-visual-tools.git
   cd block-visual-tools
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development mode:
   ```bash
   npm run start
   ```

### Building for Production
1. Create production build:
   ```bash
   npm run build
   ```

2. Required files for distribution:
   ```
   block-visual-tools/
   ├── build/              # Built files
   │   ├── index.js
   │   ├── index.asset.php
   │   └── style.css
   ├── block-visual-tools.php
   ├── package.json
   └── README.md
   ```

## System Requirements
- WordPress 6.0 or higher
- PHP 7.4 or higher

## License
GPL v2 or later

## Support
For issues and feature requests, please use the GitHub issues page.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.