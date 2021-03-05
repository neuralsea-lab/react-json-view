import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.Component {
    render() {
        return <div {...Theme(this.props.theme, 'null')}>NULL</div>;
    }
}
