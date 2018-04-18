import React from 'react';

export default class Metadata extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a className="noDecoration" href={this.props.metadata.url}>
                <div className="metadata">
                    <a className="link" href={this.props.metadata.url}>
                        {this.props.metadata.source}
                    </a>
                    <img className="pic" src={this.props.metadata.image}
                        alt={this.props.metadata.source}/>
                    <div className="text">
                        {this.props.metadata.description}
                    </div>
                    <style jsx>
                        {`
                        .metadata
                        {
                            text-align: center;
                            display: flex;
                            width: 25%;
                            flex-direction: column;
                            justify-content: space-around;
                            font-family: 'Lato', sans-serif;
                            margin: 10px;
                            padding: 10px;
                            border-right: 2px rgb(255, 129, 124) double;
                            background: rgb(255, 229, 204, 0.15);
                        }
                        .metadata:hover
                        {
                            background: rgb(255, 229, 204);
                        }

                        .link
                        {
                            color: #3979aa;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .pic
                        {
                            margin-top: 10px;
                            max-width:100%;
                            border-radius: 10%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .text
                        {
                            font-size: 14px;
                            text-decoration: underline !important;
                            color: #000000;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                        }
                    `}
                    </style>
                </div>
            </a>
        );
    }
}
