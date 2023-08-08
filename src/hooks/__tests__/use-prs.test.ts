import { type IReview } from 'types/pull-request';
import { isApproved } from '../use-prs.ts';

const defaultReview: IReview = {
  state: 'APPROVED',
  author: {
    login: 'toto',
  },
  createdAt: '',
  lastEditedAt: '',
};

describe('usePr', () => {
  describe('isApproved', () => {
    it('Should be approved', () => {
      const threshold = 1;
      const reviews: IReview[] = [
        defaultReview,
        defaultReview,
      ];
      const approved = isApproved(reviews, threshold);
      expect(approved).toBeTruthy();
    });
    it('Should not be approved', () => {
      const threshold = 3;
      const reviews: IReview[] = [
        defaultReview,
        defaultReview,
      ];
      const approved = isApproved(reviews, threshold);
      expect(approved).toBeFalsy();
    });
  });
});
