/*global WPGraphQL */

'use strict';

((window, WPGraphQL) => {
    WPGraphQL.queries = {
        pages: `{
            pages {
              nodes {
                id
                title
                date
              }
            }
          }
          `
    };
    WPGraphQL.sendQuery = (conn, query) => {
        return fetch(conn, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: query
            })
        });
    };
    WPGraphQL.connections = {
        wpgraphql: 'https://keithratner.live/graphql'
    };
    WPGraphQL.getWPGraphQLPages = () => {
        return WPGraphQL.sendQuery(
            WPGraphQL.connections.wpgraphql,
            WPGraphQL.queries.pages
        );
    };
})(window, (window.WPGraphQL = window.WPGraphQL || {}));
