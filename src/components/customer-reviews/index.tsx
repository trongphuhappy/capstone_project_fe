import { useState } from "react";
import { Ratings } from "@/components/ui/rating";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { IoCheckmark } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { parseISO } from "date-fns";

// const reviews = [
//     {
//         name: "Ngô Anh Long",
//         avatar: "L",
//         memberSince: "Joined 7 years",
//         totalReviews: 15,
//         totalLikes: 0,
//         date: "6 months ago",
//         rating: 5,
//         comment: "Product quality is too good",
//         image: "/images/sample-review.jpg",
//         purchased: true,
//         response: {
//             avatar: "A",
//             author: "Neighbor Trading",
//             date: "6 months ago",
//             content:
//                 "Neighbor is very happy to receive a 5⭐ rating from you. Hope you will continue to support Neighbor!",
//         },
//     },

//     {
//         name: "Ngô Anh Long",
//         avatar: "L",
//         memberSince: "Joined 7 years",
//         totalReviews: 15,
//         totalLikes: 0,
//         date: "6 months ago",
//         rating: 4,
//         comment: "Product quality is too good",
//         image: "/images/sample-review.jpg",
//         purchased: true,
//         response: {
//             avatar: "A",
//             author: "Neighbor Trading",
//             date: "6 months ago",
//             content:
//                 "Neighbor is very happy to receive a 5⭐ rating from you. Hope you will continue to support Neighbor!",
//         },
//     },

//     {
//         name: "Ngô Anh Long",
//         avatar: "L",
//         memberSince: "Joined 7 years",
//         totalReviews: 15,
//         totalLikes: 0,
//         date: "6 months ago",
//         rating: 3,
//         comment: "Product quality is too good",
//         image: "/images/sample-review.jpg",
//         purchased: true,
//         response: {
//             avatar: "A",
//             author: "Neighbor Trading",
//             date: "6 months ago",
//             content:
//                 "Neighbor is very happy to receive a 5⭐ rating from you. Hope you will continue to support Neighbor!",
//         },
//     },
// ];

interface IFeedBackProps {
  Feedbacks: API.TFeedback[];
}
export default function CustomerReviews({ Feedbacks }: IFeedBackProps) {
  const [filter, setFilter] = useState("all");
  const [showAllReviews, setShowAllReviews] = useState(false);

  // const filteredReviews = reviews.filter((review) => {
  //     if (filter === "all") return true;
  //     if (filter === "5 Stars") return review.rating === 5;
  //     if (filter === "4 Stars") return review.rating === 4;
  //     if (filter === "3 Stars") return review.rating === 3;
  //     if (filter === "2 Stars") return review.rating === 2;
  //     if (filter === "1 Star") return review.rating === 1;
  //     return true;
  // });

  // const reviewsToShow = showAllReviews ? filteredReviews : filteredReviews.slice(0, 1);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Customer reviews</h2>
      <div className="flex flex-col gap-4 border-b py-4">
        <div>
          <div className="flex gap-4">
            <p className="text-5xl font-bold">5.0</p>
            <Ratings rating={5} variant="yellow" />
          </div>
          <p>({Feedbacks?.length} reviews)</p>
        </div>
        {/* <div>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(
              (review) => review.rating === star
            ).length;
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
        </div> */}
      </div>

      <div className="mt-4 flex gap-2">
        {["Newest", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"].map(
          (filterOption) => (
            <button
              key={filterOption}
              onClick={() =>
                setFilter(filterOption === "Newest" ? "all" : filterOption)
              }
              className={`px-4 py-2 border rounded-full flex items-center gap-2 ${
                filter === (filterOption === "Newest" ? "all" : filterOption)
                  ? "text-blue-500 border-blue-500 bg-blue-50"
                  : ""
              }`}
            >
              {filter ===
                (filterOption === "Newest" ? "all" : filterOption) && (
                <IoCheckmark className="text-blue-500" />
              )}
              {filterOption}
            </button>
          )
        )}
      </div>

      <div className="mt-6">
        {Feedbacks?.length === 0 ? (
          <p className="text-center text-gray-500">
            No matching comments found
          </p>
        ) : (
          Feedbacks?.map((review, index) => (
            <div key={index} className="border-b py-4 flex space-x-8">
              <div className="flex-3 w-3/12">
                {/* Thông tin người đánh giá */}
                <div className="flex flex-col gap-4">
                  {/* Phần thông tin người dùng */}
                  <div className="flex gap-x-8">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-lg font-bold">
                        <figure className="w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer">
                          <div
                            style={{
                              borderRadius: "50%",
                              overflow: "hidden",
                              width: "80px",
                              height: "80px",
                            }}
                            className="flex items-center justify-between"
                          >
                            <img
                              src={
                                review.account?.cropAvatarUrl ||
                                "/images/unknown.webp"
                              }
                              width={80}
                              height={80}
                              alt="avatar"
                            />
                          </div>
                        </figure>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {review.account?.firstName +
                          " " +
                          review.account?.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Phần thông tin bổ sung */}
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <GoComment />
                        <span>Written</span>
                      </div>
                      <div>
                        {review.createdDate &&
                          parseISO(review.createdDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <BiLike />
                        <span>Received</span>
                      </div>
                      {/* <div>{review.totalLikes} Thanks</div> */}
                      <div>Thanks</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-9 w-9/12">
                {/* Nội dung đánh giá */}
                <div>
                  <div className="flex gap-4">
                    <div>
                      <p className="font-semibold text-gray-800">Feedback</p>
                    </div>
                  </div>

                  <p className="mt-2">{review.content}</p>
                  {/* <p className="text-sm text-gray-500 mt-2">
                    Rate in {review.date}
                  </p> */}
                </div>

                {/* Hành động */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-4 text-sm">
                    <button className="flex items-center gap-1">
                      <span>
                        <BiLike />
                      </span>
                      <p>Useful</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {/* {!showAllReviews && filteredReviews.length > 1 && (
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
                )} */}
      </div>
    </div>
  );
}
