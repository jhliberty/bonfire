import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    toggleMenu(type) {
      this.toggleProperty("popoverIsShowing");
    }
  }
});
