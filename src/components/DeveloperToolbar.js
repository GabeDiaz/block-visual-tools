import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';

const VisualToolbar = () => {
    const [showOutlines, setShowOutlines] = useState(false);
    const [showInspector, setShowInspector] = useState(false);

    const toggleOutlines = () => {
        setShowOutlines(!showOutlines);
        document.body.classList.toggle('block-visual-tools-outline');
    };

    const toggleInspector = () => {
        setShowInspector(!showInspector);
        document.body.classList.toggle('block-visual-tools-inspector');
    };

    return (
        <ToolbarGroup>
            <ToolbarButton
                icon="visibility"
                label="Toggle Block Outlines"
                isPressed={showOutlines}
                onClick={toggleOutlines}
            />
            <ToolbarButton
                icon="info"
                label="Toggle Class/ID Inspector"
                isPressed={showInspector}
                onClick={toggleInspector}
            />
        </ToolbarGroup>
    );
};

registerPlugin('block-visual-tools', {
    render: VisualToolbar,
    icon: 'admin-tools',
}); 