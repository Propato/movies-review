import { Router } from 'express';
import { createReview, deleteReview, getReviews, updateReview } from '../controllers/review.controller';

const reviewRoutes = Router();

reviewRoutes.route('/:listId')
    .post(createReview)
    .get(getReviews);

reviewRoutes.route('/:listId/:movieId')
    .put(updateReview)
    .delete(deleteReview);

export default reviewRoutes;