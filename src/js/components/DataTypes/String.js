import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';

//theme
import Theme from './../../themes/getStyle';

//attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes';
import { ItemTypes } from './ItemTypes';
import { DragSource, useDrop } from 'react-dnd';

const sourceSpec = {
    beginDrag(props) {
        return { val: props.name, src: props.src };
    },
    endDrag(props) {
        console.log(props);
    }
};

class String extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: AttributeStore.get(
                props.rjvId,
                props.namespace,
                'collapsed',
                true
            )
        };
    }

    toggleCollapsed = () => {
        this.setState(
            {
                collapsed: !this.state.collapsed
            },
            () => {
                AttributeStore.set(
                    this.props.rjvId,
                    this.props.namespace,
                    'collapsed',
                    this.state.collapsed
                );
            }
        );
    };

    render() {
        const type_name = 'string';
        const { collapsed } = this.state;
        const { props } = this;
        const {
            collapseStringsAfterLength,
            theme,
            isDragging,
            connectDragSource
        } = props;
        let { value } = props;
        let collapsible = toType(collapseStringsAfterLength) === 'integer';
        let style = { style: { cursor: 'default' } };

        if (collapsible && value.length > collapseStringsAfterLength) {
            style.style.cursor = 'pointer';
            if (this.state.collapsed) {
                value = (
                    <span>
                        {value.substring(0, collapseStringsAfterLength)}
                        <span {...Theme(theme, 'ellipsis')}> ...</span>
                    </span>
                );
            }
        }

        return connectDragSource(
            <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    class="string-value"
                    {...style}
                    onClick={this.toggleCollapsed}
                >
                    "{value}"
                </span>
            </div>
        );
    }
}

export default DragSource(ItemTypes.STRING, sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(String);
