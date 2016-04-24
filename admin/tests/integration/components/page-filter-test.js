/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'page-filter',
  'Integration: PageFilterComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#page-filter}}
      //     template content
      //   {{/page-filter}}
      // `);

      this.render(hbs`{{page-filter}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
