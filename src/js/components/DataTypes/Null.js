import React from 'react';
import Theme from './../../themes/getStyle';
import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';

const sourceSpec = {
    beginDrag(props) {
        console.log(props);
    },
    endDrag(props) {
        console.log(props);
    }
};

class Null extends React.Component {
    render() {
        const { connectDragSource, ...rest } = this.props;

        return connectDragSource(
            <div {...Theme(this.props.theme, 'null')}>NULL</div>
        );
    }
}

export default DragSource(ItemTypes.NULL, sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(Null);
