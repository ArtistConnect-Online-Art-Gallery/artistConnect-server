const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');

// @desc    get all reported items
// @route   GET reportedItems/
// @access  Admin

const getAllReportedItems = {
	getAllReportedItems: async (req, res) => {
		try {
			// found all users with reported itmes
			const usersWithReports = await User.find({
				$or: [
					{ reportedArtworks: { $exists: true, $not: { $size: 0 } } },
					{ reportedComments: { $exists: true, $not: { $size: 0 } } },
				],
			})
				.populate('reportedArtworks')
				.populate('reportedComments');

			// create arrays to store all reported artworks and comments
			const reportedArtworks = [];
			const reportedComments = [];

			usersWithReports.forEach((user) => {
				if (user.reportedArtworks.length > 0) {
					reportedArtworks.push(...user.reportedArtworks);
				}
				if (user.reportedComments.length > 0) {
					reportedComments.push(...user.reportedComments);
				}
			});

			// 返回所有举报的艺术品和评论给管理员
			res.status(200).json({
				reportedArtworks,
				reportedComments,
			});
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};

// @desc    delete comment
// @route   POST comments/:id
// @access  Admin

module.exports = {
	getAllComments,
	createComment,
	updateComment,
	deleteComment,
};
