/**
 *
 * @providesModule TWTRLogInButtonIOS
 * @flow
 *
 * This is a controlled component version of TwitterLoginButton.
 */
'use strict';

var React = require('React');
var NativeMethodsMixin = require('NativeMethodsMixin');
var PropTypes = require('ReactPropTypes');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var StyleSheet = require('StyleSheet');

var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');

var TWTRLOGINBUTTON = 'twtrloginbutton';

var TwitterLoginButton = React.createClass({
  mixins: [NativeMethodsMixin],     

  propTypes: {
    /**
     * Callback that is called when the user toggles the switch.
     */
    onSuccess: PropTypes.func,

    /**
     * Background color when the switch is turned on.
     */
    onError: PropTypes.func,

  },
  _onChange: function(event: Event) {
    event.nativeEvent.error && this.props.onError && this.props.onError(event.nativeEvent.error);
    !event.nativeEvent.error && this.props.onSuccess && this.props.onSuccess(event.nativeEvent);

  },
  render: function() {
    return ( 
      <TWTRLogInButton onChange={this._onChange}  ref={TWTRLOGINBUTTON} style={styles.TwitterLoginButton}/>
    );
  }
});

var styles = StyleSheet.create({
  TwitterLoginButton: {height: 50,width: 200},
});

var TWTRLogInButton = createReactIOSNativeComponentClass({
  validAttributes: ReactIOSViewAttributes.UIView,
  uiViewClassName: 'TWTRLogInButton'
});

module.exports = TwitterLoginButton;
