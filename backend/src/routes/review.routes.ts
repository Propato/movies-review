import { Router } from 'express';
import { createReview, deleteReview, getReview, getReviews, updateReview } from '../controller/review.controller';

const reviewRoutes = Router();

reviewRoutes.route('/')
    .post(createReview);

reviewRoutes.route('/:userId')
    .get(getReviews);

reviewRoutes.route('/:userId/:movieId')
    .get(getReview)
    .put(updateReview)
    .delete(deleteReview);

export default reviewRoutes;