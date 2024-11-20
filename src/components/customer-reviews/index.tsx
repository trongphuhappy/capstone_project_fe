import { useState } from "react";
import { Ratings } from "@/components/ui/rating";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";

const reviews = [
    {
        name: "Ngô Anh Long",
        avatar: "L",
        memberSince: "Joined 7 years",
        totalReviews: 15,
        totalLikes: 0,
        date: "6 months ago",
        rating: 5,
        comment: "Product quality is too good",
        image: "/images/sample-review.jpg",
        purchased: true,
        response: {
            avatar: "A",
            author: "Neighbor Trading",
            date: "6 months ago",
            content:
                "Neighbor is very happy to receive a 5⭐ rating from you. Hope you will continue to support Neighbor!",
        },
    },

    {
        name: "Ngô Anh Long",
        avatar: "L",
        memberSince: "Joined 7 years",
        totalReviews: 15,
        totalLikes: 0,
        date: "6 months ago",
        rating: 4,
        comment: "Product quality is too good",
        image: "/images/sample-review.jpg",
        purchased: true,
        response: {
            avatar: "A",
            author: "Neighbor Trading",
            date: "6 months ago",
            content:
                "Neighbor is very happy to receive a 5⭐ rating from you. Hope you will continue to support Neighbor!",
        },
    },

    {
        name: "Ngô Anh Long",
        avatar: "L",
        memberSince: "Joined 7 years",
        totalReviews: 15,
        totalLikes: 0,
        date: "6 months ago",
        rating: 3,
        comment: "Product quality is too good",
        image: "/images/sample-review.jpg",
        purchased: true,
        response: {
            avatar: "A",
            author: "Neighbor Trading",
            date: "6 months ago",
            content:
                "Neighbor is very happy to receive a 5⭐ rating from you. Hope you will continue to support Neighbor!",
        },
    },
];

export default function CustomerReviews() {
    const [filter, setFilter] = useState("all");
    const [showAllReviews, setShowAllReviews] = useState(false);

    const filteredReviews = reviews.filter((review) => {
        if (filter === "all") return true;
        if (filter === "5 Stars") return review.rating === 5;
        if (filter === "4 Stars") return review.rating === 4;
        if (filter === "3 Stars") return review.rating === 3;
        if (filter === "2 Stars") return review.rating === 2;
        if (filter === "1 Star") return review.rating === 1;
        return true;
    });

    const reviewsToShow = showAllReviews ? filteredReviews : filteredReviews.slice(0, 1);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5">Customer reviews</h2>
            <div className="flex flex-col gap-4 border-b py-4">
                <div>
                    <div className="flex gap-4">
                        <p className="text-5xl font-bold">5.0</p>
                        <Ratings rating={5} variant="yellow" />
                    </div>
                    <p>({reviews.length} reviews)</p>
                </div>
                <div>
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter((review) => review.rating === star).length;
                        return (
                            <div key={star} className="flex items-center">
                                <Ratings rating={star} variant="yellow" />
                                <div className="h-1 w-[150px] bg-gray-300 mx-2">
                                    {star === 5 && <div className="h-1 bg-yellow-400 w-full" />}
                                </div>
                                <p>{count}</p>
                            </div>
                        );
                    })}
                </div>

            </div>

            <div className="mt-4 flex gap-2">
                {["Newest", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"].map((filterOption) => (
                    <button
                        key={filterOption}
                        onClick={() => setFilter(filterOption === "Newest" ? "all" : filterOption)}
                        className={`px-4 py-2 border rounded-full flex items-center gap-2 ${filter === (filterOption === "Newest" ? "all" : filterOption) ? "text-blue-500 border-blue-500 bg-blue-50" : ""}`}
                    >
                        {filter === (filterOption === "Newest" ? "all" : filterOption) && <IoCheckmark className="text-blue-500" />}
                        {filterOption}
                    </button>
                ))}
            </div>


            <div className="mt-6">
                {reviewsToShow.length === 0 ? (
                    <p className="text-center text-gray-500">No matching comments found</p>
                ) : (

                    reviewsToShow.map((review, index) => (
                        <div key={index} className="border-b py-4 flex space-x-8">
                            <div className="flex-3 w-3/12">
                                {/* Thông tin người đánh giá */}
                                <div className="flex flex-col gap-4">
                                    {/* Phần thông tin người dùng */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-lg font-bold">
                                                {review.avatar}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg">{review.name}</p>
                                            <p className="text-sm text-gray-500">{review.memberSince}</p>
                                        </div>
                                    </div>

                                    {/* Phần thông tin bổ sung */}
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <GoComment />
                                                <span>Written</span>
                                            </div>
                                            <div>{review.totalReviews} Reviews</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <BiLike />
                                                <span>Received</span>
                                            </div>
                                            <div>{review.totalLikes} Thanks</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex-9 w-9/12">
                                {/* Nội dung đánh giá */}
                                <div >
                                    <div className="flex gap-4">
                                        <div>
                                            <Ratings rating={review.rating} variant="yellow" />
                                            <p className="text-green-600 font-medium text-sm">
                                                {review.purchased && "Purchased"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Extremely satisfied</p>
                                        </div>
                                    </div>

                                    <p className="mt-2">{review.comment}</p>
                                    {review.image && (
                                        <img
                                            src={review.image}
                                            alt="Review"
                                            className="mt-2 w-[120px] h-[120px] object-cover border rounded"
                                        />
                                    )}
                                    <p className="text-sm text-gray-500 mt-2">
                                        Rate in {review.date}
                                    </p>
                                </div>

                                {/* Hành động */}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-4 text-sm">
                                        <button className="flex items-center gap-1">
                                            <span><BiLike /></span>
                                            <p>Useful</p>
                                        </button>
                                        <button className="flex items-center gap-1">
                                            <span><FaRegComment />
                                            </span>
                                            <p>1</p>
                                        </button>
                                    </div>
                                    <div>
                                        <button className="flex items-center gap-1">
                                            <span><GoShareAndroid /></span>
                                            <p>Share</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Phản hồi từ admin */}
                                {review.response && (
                                    <div className="mt-4 bg-gray-100 p-3 rounded flex gap-4">
                                        {/* Avatar của admin */}
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 flex items-center justify-center bg-[#0056a3] text-white rounded-full text-lg font-bold">
                                                {review.response.avatar}
                                            </div>
                                        </div>

                                        {/* Nội dung phản hồi */}
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{review.response.author}</p>
                                                <IoMdCheckmarkCircle className="text-blue-500" />
                                                <span className="h-4 w-px bg-gray-300"></span>
                                                <p className="text-sm text-gray-500">{review.response.date}</p>
                                            </div>
                                            <p className="mt-2">{review.response.content}</p>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {!showAllReviews && filteredReviews.length > 1 && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowAllReviews(true)}
                            className="font-semibold border border-gray-500 rounded px-6 py-2 hover:bg-slate-100"
                        >
                            See More
                        </button>
                    </div>
                )}
                {showAllReviews && filteredReviews.length > 1 && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowAllReviews(false)}
                            className="font-semibold border border-gray-500 rounded px-6 py-2 hover:bg-slate-100"
                        >
                            Show Less
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
