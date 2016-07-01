/**
 * External dependencies
 */
import includes from 'lodash/includes';
import find from 'lodash/find';
import map from 'lodash/map';
import debugModule from 'debug';

/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';
import { getCurrentUser } from 'state/current-user/selectors';

const debug = debugModule( 'calypso:reader:start' ); //eslint-disable-line no-unused-vars

/**
 * Returns true if currently requesting recommendations.
 *
 * @param  {Object}  state  Global state tree
 * @return {Boolean}        Whether recommendations are being requested
 */
export function isRequestingRecommendations( state ) {
	return !! state.reader.start.isRequestingRecommendations;
}

/**
 * Returns a single recommendation by ID.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Integer}  recommendationId  Recommendation ID
 * @return {Object} Recommendation
 */
export function getRecommendationById( state, recommendationId ) {
	return find( state.reader.start.items, { ID: recommendationId } );
}

/**
 * Returns recommendations.
 *
 * @param  {Object}  state  Global state tree
 * @return {Object} Recommendations
 */
export function getRecommendations( state ) {
	return state.reader.start.items;
}

/**
 * Returns recommendation IDs.
 *
 * @param  {Object}  state  Global state tree
 * @return {Array} Recommendations IDs
 */
export const getRecommendationIds = createSelector(
	( state ) => map( state.reader.start.items, 'ID' ),
	( state ) => [ state.reader.start.items ]
);

/**
 * Which recommendations has the user already interacted with?
 *
 * @param  {Object}  state  Global state tree
 * @return {Array} Recommendations
 */
export function getRecommendationsInteractedWith( state ) {
	return state.reader.start.recommendationsInteractedWith;
}

/**
 * Has the user interacted with the specified recommendation?
 *
 * @param  {Object}  state  Global state tree
 * @param {Integer} recommendationId Recommendation ID
 * @return {Boolean} Has user interacted?
 */
export function hasInteractedWithRecommendation( state, recommendationId ) {
	return includes( state.reader.start.recommendationsInteractedWith, recommendationId );
}

/**
 * Has the user graduated from the new Reader recommendations process?
 *
 * @param  {Object}  state  Global state tree
 * @param {Integer} recommendationId Recommendation ID
 * @return {Boolean} Has user interacted?
 */
export function hasGraduatedRecommendations( state ) {
	let graduated = state.reader.start.isNewReader;
	//const user = getCurrentUser( state );
	//console.log( 'user:', user );
	// TODO: grab the current user's `is_new_reader` value and use that if present
	return graduated;
}
