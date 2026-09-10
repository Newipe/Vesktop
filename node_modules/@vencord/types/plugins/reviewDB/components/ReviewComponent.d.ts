import { Review } from "../entities";
export default function ReviewComponent({ review, refetch, profileId }: {
    review: Review;
    refetch(): void;
    profileId: string;
}): import("react").JSX.Element;
