import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    // при вызове OnSubmit, props будет не this.props, а from this.props. Мы забиндили this формы. И поэтому функцие берет this формы
    onSubmit(props) {
        this.props.createPost(props) // action creator which return the promise
            .then(() => {
                // идеальное место чтобы вернутся на главную, так как у нас в props-ах resolve промиса. А это значит что пост был создан
                // тут мы вызваем this.context.router.push и передаем ему путь куда перейти ("/")
                console.log(this);
                this.context.router.push('/')
            })
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props; // ES6
        // const handleSubmit = this.props.handleSubmit; ES5
        // const title = this.props.title

        // handleSubmit был такой
        // handleSubmit(this.props.createPost)
        // мы вынисли createPost в отдельную функцию onSubmit чтобы добавить возможность перейти на главную
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                posts_new.js/
                <h3>Create a new post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${categories.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>
                <div className={`form-group ${content.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
                <Link to="/" className="btn btn-danger">Cancer</Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = 'Enter Title'
    }
    if(!values.categories) {
        errors.categories = 'Enter Categories'
    }
    if(!values.content) {
        errors.content = 'Enter some text'
    }
    return errors
}

// connext: 1st arg is mapStateToProps, 2nd arg is mapDispatchToProps
// reduxForm(1,2,3 args): 1st arg is form config, 2nd arg is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    form: 'PostsNew',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew); // аналог connect из react-redux