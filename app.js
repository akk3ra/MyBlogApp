Sakker = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Sakker.Router = Ember.Router.extend({
  location: 'hash'
});
Sakker.Router.map(function(){

  this.resource('blogs', {path: '/blogs'}, function(){
      this.route('blog', {path: '/:blog_id'});
  })
});

Sakker.IndexRoute = Ember.Route.extend({
  redirect: function(){
    this.transitionTo('blogs');
  }
});
Sakker.BlogsRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('blog');
  }
});
Sakker.BlogsBlogRoute = Ember.Route.extend({
  model: function(blog){
    Ember.debug("The blog id inside the blogs.blog route-->>"+blog.blog_id);
    return this.store.find('blog', blog.blog_id);
  },
  setupController: function(controller, model){
    // This properties below again have to be made false because if we click on the New button and then click
    // any other blog link, the the NewBlog template remains still, ideally it should route to the 
    // blog which is clicked.
      controller.set('isNewBlog', false);
      controller.set('isEditing', false);
      Ember.debug("Inside the BlogsBlogRoute setupController function----");
    this._super(controller, model);   
  }
});
Sakker.BlogsBlogController = Ember.ObjectController.extend({

  isEditing: null,
  isNewBlog: null,
  newTitle: null,
  newLongIntro: null,
  actions: {

    editBlog: function(blogId){
      Ember.debug("Inside the BlogsBlogController editBlog function----");
      this.set('isEditing', true);
    },
    saveBlog: function(blogId){
      this.set('isEditing', false);
      var newRecord = this.store.createRecord('blog', {
          id: blogId,
          title: this.get('title'),
          longIntro: this.get('longIntro')
      });
      newRecord.save();
    },
    newBlog: function(){
      this.set('isNewBlog', true);
      this.set('isEditing', true);
    },
    newBlogSave: function(){
        this.set('isEditing', false);
        var newRecord1 = this.store.createRecord('blog', {
        title: this.get('newTitle'),
        longIntro: this.get('newLongIntro')
      });
      newRecord1.save();
      this.set('newTitle', null);
      this.set('newLongIntro', null);
    },
    cancelSave: function(){
      this.set('isEditing', false);
      this.set('isNewBlog', false);
    },
    cancelEdit: function(){
      this.set('isEditing', false);
      this.set('isNewBlog', false);
    }
  }

});
Sakker.Store = DS.Store.extend({
  revision: 2,
  adapter: DS.FixtureAdapter
});
Sakker.Blog = DS.Model.extend({
  title: DS.attr('string'),
  shortIntro: DS.attr('string'),
  longIntro: DS.attr('string')
});
Sakker.Blog.FIXTURES = [
  {id: 1, title: "My School", shortIntro: "It was 12 long years", longIntro: "It was 12 long yearsIt was 12 long yearsIt was 12 long yearsIt was 12 long years"},
  {id: 2, title: "My Intermediate", shortIntro: "It was 2 long years", longIntro: "It was 2 long yearsIt was 2 long yearsIt was 2 long yearsIt was 2 long years"},
  {id: 3, title: "My College", shortIntro: "It was 4 long years", longIntro: "It was 4 long yearsIt was 4 long yearsIt was 4 long yearsIt was 4 long years"}
]



