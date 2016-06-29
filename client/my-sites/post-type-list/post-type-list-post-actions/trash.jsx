/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import PopoverMenuItem from 'components/popover/menu-item';
import { trashPost, deletePost } from 'state/posts/actions';
import { getPost } from 'state/posts/selectors';
import { getCurrentUserId, canCurrentUser } from 'state/current-user/selectors';

function PostTypeListPostActionsTrash( { translate, siteId, postId, status, canDelete, dispatchTrashPost, dispatchDeletePost } ) {
	if ( ! canDelete ) {
		return null;
	}

	function onTrash() {
		if ( ! postId ) {
			return;
		}

		let dispatchAction;
		if ( 'trash' !== status ) {
			dispatchAction = dispatchTrashPost;
		} else if ( confirm( translate( 'Are you sure you want to permanently delete this post?' ) ) ) {
			dispatchAction = dispatchDeletePost;
		}

		if ( dispatchAction ) {
			dispatchAction( siteId, postId );
		}
	}

	return (
		<PopoverMenuItem onClick={ onTrash } icon="trash">
			{ 'trash' === status
				? translate( 'Delete Permanently' )
				: translate( 'Trash', { context: 'verb' } ) }
		</PopoverMenuItem>
	);
}

PostTypeListPostActionsTrash.propTypes = {
	globalId: PropTypes.string,
	translate: PropTypes.func.isRequired,
	postId: PropTypes.number,
	siteId: PropTypes.number,
	status: PropTypes.string,
	canDelete: PropTypes.bool,
	dispatchTrashPost: PropTypes.func,
	dispatchDeletePost: PropTypes.func
};

export default connect(
	( state, ownProps ) => {
		const post = getPost( state, ownProps.globalId );
		if ( ! post ) {
			return {};
		}

		const userId = getCurrentUserId( state );
		const isAuthor = post.author && post.author.ID === userId;

		return {
			postId: post.ID,
			siteId: post.site_ID,
			status: post.status,
			canDelete: canCurrentUser( state, post.site_ID, isAuthor ? 'delete_posts' : 'delete_others_posts' )
		};
	},
	{
		dispatchTrashPost: trashPost,
		dispatchDeletePost: deletePost
	}
)( localize( PostTypeListPostActionsTrash ) );
