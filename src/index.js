import './style.css';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ToggleControl, Panel, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Add custom attributes to all blocks
 * These attributes will store the state for hiding and highlighting blocks
 */
addFilter(
    'blocks.registerBlockType',
    'block-visual-tools/add-attributes',
    (settings) => {
        settings.attributes = {
            ...settings.attributes,
            isHidden: {
                type: 'boolean',
                default: false,
            },
            isHighlighted: {
                type: 'boolean',
                default: false,
            },
        };
        return settings;
    }
);

/**
 * Add inspector controls to the block sidebar
 * This adds our toggle controls for hiding and highlighting blocks
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, name, clientId } = props;

        // Skip template parts as they shouldn't be modified
        if (name === 'core/template-part') {
            return <BlockEdit {...props} />;
        }

        /**
         * Toggle highlight effect for the selected block and its children
         * @param {boolean} value - The toggle state
         */
        const toggleHighlight = (value) => {
            setAttributes({ isHighlighted: value });
            
            // Find the site editor iframe where the actual content lives
            const editorIframe = document.querySelector('iframe[name="editor-canvas"]');
            if (editorIframe && editorIframe.contentDocument) {
                // Find the current block using its unique ID
                const currentBlock = editorIframe.contentDocument.querySelector(`[data-block="${clientId}"]`);
                if (currentBlock) {
                    // Get all elements within this block (including the block itself)
                    const allElements = [currentBlock, ...currentBlock.querySelectorAll('*')];
                    
                    // Apply or remove borders to show structure
                    allElements.forEach(element => {
                        if (value) {
                            element.style.setProperty('border', '1px solid #333', 'important');
                        } else {
                            element.style.removeProperty('border');
                        }
                    });
                }
            }
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <Panel>
                        <PanelBody title="Visual Tools">
                            <ToggleControl
                                label="Hide Block"
                                checked={attributes.isHidden}
                                onChange={(value) => setAttributes({ isHidden: value })}
                            />
                            <ToggleControl
                                label="Show Block Structure"
                                checked={attributes.isHighlighted}
                                onChange={toggleHighlight}
                            />
                        </PanelBody>
                    </Panel>
                </InspectorControls>
            </>
        );
    };
}, 'withInspectorControls');

addFilter(
    'editor.BlockEdit',
    'block-visual-tools/inspector-controls',
    withInspectorControls
);

/**
 * Add custom styles to blocks
 * This handles the hiding functionality
 */
const withCustomStyles = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const { attributes } = props;
        
        let wrapperProps = props.wrapperProps || {};
        let customStyle = wrapperProps.style || {};

        // Apply display: none if block is hidden
        if (attributes.isHidden) {
            customStyle = {
                ...customStyle,
                display: 'none',
            };
        }

        wrapperProps = {
            ...wrapperProps,
            style: customStyle,
        };

        return (
            <BlockListBlock
                {...props}
                wrapperProps={wrapperProps}
            />
        );
    };
}, 'withCustomStyles');

addFilter(
    'editor.BlockListBlock',
    'block-visual-tools/custom-styles',
    withCustomStyles
);

// Register the plugin with the desired label
registerPlugin('block-visual-tools', {
    render: VisualToolbar,
    icon: 'admin-tools',
    // Set the label for the plugin
    title: 'Visual Tools', // Set the title here
}); 