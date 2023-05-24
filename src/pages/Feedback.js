import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    feedbackText: '',
  };

  componentDidMount() {
    const { assertions } = this.props;
    const minAssertions = 3;
    this.setState({
      feedbackText: assertions < minAssertions ? 'Could be better...' : 'Well Done!',
    });
  }

  render() {
    const { feedbackText } = this.state;
    return (
      <div>
        <p data-testid="feedback-text">{feedbackText}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
