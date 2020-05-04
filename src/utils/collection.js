class collection {
  _currentPage = 0;
  _query = ''
  offset = 0
  limit = 10

  constructor(query: string) {
    this._query = query;
  }

  fetch(variables: object): Promise<any> {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: this._query,
        variables: variables,
      })
    }).then(response => {
      return response.json();
    });
  }

  fetchAll(offset: number, limit: number, variables: object): Promise<any> {
    return this.fetch({
      "offset": offset,
      "limit": this.limit,
      ...variables
    })
  }
}

export default collection
