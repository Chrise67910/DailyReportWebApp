import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../index.css';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';


export const Header = (props) => {
        return(
            <div className="Header">
                <Link to = {"/home"}><div className="box">Übersicht</div></Link>
                <Link to = {"/customer"}><div className="box">Kunden</div></Link>
            </div>
        );
};