import React from 'react';
import PropTypes from 'prop-types';

import buildParts from './build_parts';

function GTMParts(args) {
    const parts = buildParts(args);

    function noScriptAsReact() {
        return <noscript dangerouslySetInnerHTML={{ __html: parts.iframe }}></noscript>;
    }

    function noScriptAsHTML() {
        return `<noscript>${parts.iframe}</noscript>`;
    }

    function scriptAsReact() {
        return <script dangerouslySetInnerHTML={{ __html: parts.script }}></script>;
    }

    function scriptAsHTML() {
        return `<script>${parts.script}</script>`;
    }

    return {
        noScriptAsReact,
        noScriptAsHTML,
        scriptAsReact,
        scriptAsHTML
    };
}

class GoogleTagManager extends React.Component {
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

        if (!window[dataLayerName]) {
            const gtmScriptNode = document.getElementById(scriptId);

            eval(gtmScriptNode.textContent);
        }
    }

    render() {
        const gtm = GTMParts({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
        });

        return (
            <div>
                <div>{gtm.noScriptAsReact()}</div>
                <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
                    {gtm.scriptAsReact()}
                </div>
            </div>
        );
    }
}

GoogleTagManager.propTypes = {
    gtmId: PropTypes.string.isRequired,
    dataLayerName: PropTypes.string,
    additionalEvents: PropTypes.object,
    previewVariables: PropTypes.string,
    scriptId: PropTypes.string
};

export default GoogleTagManager;
