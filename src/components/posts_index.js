import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item justify-content-between" key={post.id}>
                    <Link to={"posts/" + post.id}>
                        <span>{post.categories}</span>
                        <strong>{post.title}</strong>
                    </Link>
                </li>
            )
        })
    }

    render() {
        return(
            <div>
                posts_index.js/
                <div className="text-right">
                    <Link to="/posts/new" className="btn btn-primary">
                        Add Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchPosts }, dispatch)
// }
// export default connect(nill, mapDispatchToProps)(PostsIndex);
// можно заменить на это и убрать импорт редакса.

function mapStateToProps(state) {
    return { posts: state.posts.all } // МЫ ПОДКЛЮЧАЕМ К ОБЪЕКТУ POSTS СОСТОЯНИЕ НАШЕГО ПРИЛОЖЕНИЯ ПРОПИСАНОЕ В REDUX (ГДЕ??)
                                        // ЮЗАЕМ ФУНКЦИЮ КАК ПЕРВЫЙ АРГУМЕНТ Ф-Н CONNECT
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex); // or { fentchPosts: fetchPosts }
