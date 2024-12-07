<?php
/**
 * Plugin Name: Block Visual Tools
 * Description: Adds visual tools for when working in the block editor, including toggle block visibility and outline block structure.
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Version: 1.0.0
 * Author: Gabe Diaz
 * Author URI: https://www.gabediaz.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: block-visual-tools
 */

if (!defined('ABSPATH')) {
    exit;
}

class BlockVisualTools {
    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
    }

    public function init() {
        // Remove the register_block_type call as we're not actually creating a new block
    }

    public function enqueue_editor_assets() {
        $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

        wp_enqueue_script(
            'block-visual-tools',
            plugins_url('build/index.js', __FILE__),
            array_merge(['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], $asset_file['dependencies']),
            $asset_file['version']
        );

        wp_enqueue_style(
            'block-visual-tools',
            plugins_url('build/style.css', __FILE__),
            [],
            $asset_file['version']
        );
    }
}

new BlockVisualTools(); 