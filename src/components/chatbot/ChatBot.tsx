"use client";
import React, { useState, useRef, useEffect } from 'react';
import { TbMessageCircle } from "react-icons/tb";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

interface Message {
    from: 'bot' | 'user';
    text: string;
}

const ChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { from: 'bot', text: 'Hello world!' }
    ]);
    const [botTyping, setBotTyping] = useState<boolean>(false);
    const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const prompts: string[][] = [
        // Liên quan đến cho thuê đồ nội thất
        ["I need furniture", "Looking for furniture rental", "Where can I rent furniture?", "Do you rent sofas?", "Do you rent beds?"],
        ["Do you have office furniture?", "Can I rent desks and chairs?", "I need furniture for an event", "Party furniture rental options?"],
        ["What styles of furniture do you have?", "Do you rent modern furniture?", "Do you have vintage furniture for rent?"],
        ["Can I return furniture early?", "What is your return policy for furniture?", "Do you offer refunds if I return furniture early?"],
        ["Can I extend my furniture rental?", "What if I need to keep furniture longer?", "How do I extend my rental period?"],
        ["Tôi muốn thuê đồ nội thất", "Có cho thuê bàn ghế không?", "Làm sao để thuê sofa?", "Cần thuê giường tủ"],
        ["Có đồ nội thất cho văn phòng không?", "Tôi cần thuê bàn làm việc và ghế văn phòng", "Có cho thuê nội thất sự kiện không?"],
        ["Có phong cách nội thất nào hiện đại không?", "Có nội thất cổ điển cho thuê không?", "Cho thuê nội thất tối giản không?"],
        ["Tôi có thể trả đồ sớm không?", "Chính sách hoàn trả đồ nội thất như thế nào?", "Nếu trả đồ trước hạn thì sao?"],
        ["Tôi muốn gia hạn thuê nội thất", "Có thể giữ đồ lâu hơn không?", "Làm thế nào để gia hạn hợp đồng thuê?"],
        
        // Liên quan đến cho thuê phương tiện di chuyển
        ["I need transportation", "Looking for vehicle rental", "Where can I rent a car?", "Where can I rent a bike?"],
        ["Do you have electric vehicles?", "Can I rent an electric scooter?", "Do you offer eco-friendly vehicle options?"],
        ["What if I return the vehicle late?", "What is the penalty for late return?", "Is there a grace period for returning vehicles?"],
        ["Can someone else drive the rental car?", "What is the policy for multiple drivers?", "Can I add another driver?"],
        ["Do you have GPS or child seats for rent?", "Do you provide accessories with vehicles?", "Can I rent a bike with a helmet?"],
        ["Tôi muốn thuê phương tiện di chuyển", "Có xe đạp cho thuê không?", "Tôi cần thuê ô tô", "Cho thuê xe máy không?"],
        ["Có xe điện không?", "Có thuê xe tay ga không?", "Tôi muốn thuê phương tiện thân thiện môi trường"],
        ["Nếu trả xe trễ thì sao?", "Có phạt khi trả xe trễ không?", "Có thời gian gia hạn trả xe không?"],
        ["Người khác có thể lái xe thuê không?", "Chính sách về lái xe thứ hai là gì?", "Tôi muốn thêm người lái"],
        ["Có cho thuê nón bảo hiểm không?", "Tôi cần GPS và ghế trẻ em cho xe thuê", "Có phụ kiện đi kèm khi thuê xe không?"],

        // Các câu hỏi chung
        ["Can I book online?", "How to book rental online?", "Do you have a website or app?"],
        ["Is there a security deposit?", "How much is the deposit?", "When will I get my deposit back?"],
        ["Are there any hidden fees?", "What additional costs should I know about?", "Are taxes included in the price?"],
        ["Do you have promotions?", "Any current deals or discounts?", "How to get a discount?"],
        ["What are your operating hours?", "When are you open?", "Can I rent on weekends or holidays?"],
        ["Tôi có thể đặt thuê online không?", "Cách đặt thuê qua ứng dụng?", "Có trang web để đặt thuê không?"],
        ["Có yêu cầu đặt cọc không?", "Đặt cọc bao nhiêu?", "Khi nào nhận lại tiền cọc?"],
        ["Có phí ẩn không?", "Có tính thuế trong giá không?", "Có chi phí bổ sung nào không?"],
        ["Có chương trình khuyến mãi không?", "Đang có ưu đãi nào không?", "Làm sao để được giảm giá?"],
        ["Giờ làm việc thế nào?", "Cửa hàng mở cửa lúc mấy giờ?", "Có làm việc cuối tuần không?"],

        ["hi", "hey", "hello", "good morning", "good afternoon"],
        ["how are you", "how is life", "how are things"],
        ["what are you doing", "what is going on", "what is up"],
        ["how old are you"],
        ["who are you", "are you human", "are you bot", "are you human or bot"],
        ["who created you", "who made you"],
        ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
        ["i love you"],
        ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
        ["bad", "bored", "tired"],
        ["help me", "tell me story", "tell me joke"],
        ["ah", "yes", "ok", "okay", "nice"],
        ["bye", "good bye", "goodbye", "see you later"],
        ["what should i eat today"],
        ["bro"],
        ["what", "why", "how", "where", "when"],
        ["no", "not sure", "maybe", "no thanks"],
        [""],
        ["haha", "ha", "lol", "hehe", "funny", "joke"],
        ["flip a coin", "heads or tails", "tails or heads", "head or tails", "head or tail", "tail or heads", "tail or head"],
        ["coffee", "buy me a coffee", "want a coffee"]
    ];

    const replies: string[][] = [
        // Phản hồi về đồ nội thất
        ["Yes, we have a wide range of furniture for rent.", "You can rent sofas, beds, tables, and more!"],
        ["We provide office furniture like desks, chairs, and storage units.", "Yes, you can rent furniture for your office or events."],
        ["We have modern, vintage, and contemporary styles available.", "Our catalog includes various styles to match your needs."],
        ["You can return furniture early, but please check our policy for refunds.", "Early returns are allowed; contact support for details."],
        ["To extend your rental, visit our website or call our support team.", "Yes, rental extensions are possible with advance notice."],
        ["Chúng tôi có nhiều loại đồ nội thất cho thuê, bao gồm bàn, ghế, giường và tủ.", "Có sẵn nội thất phù hợp cho nhu cầu của bạn!"],
        ["Chúng tôi có nội thất văn phòng như bàn làm việc, ghế xoay và tủ hồ sơ.", "Nội thất sự kiện cũng có, liên hệ để biết thêm chi tiết."],
        ["Có, chúng tôi cung cấp nội thất hiện đại, cổ điển và tối giản.", "Danh mục của chúng tôi rất đa dạng để đáp ứng mọi phong cách."],
        ["Bạn có thể trả đồ sớm, nhưng vui lòng tham khảo chính sách hoàn trả.", "Chúng tôi sẽ hỗ trợ bạn khi trả đồ trước hạn."],
        ["Để gia hạn, vui lòng liên hệ qua ứng dụng hoặc hotline.", "Bạn có thể gia hạn dễ dàng qua hệ thống của chúng tôi."],


        // Phản hồi về phương tiện di chuyển
        ["We offer cars, bikes, and scooters for rent.", "Transportation options include cars, electric bikes, and more."],
        ["Yes, we have electric vehicles and eco-friendly options.", "Electric scooters are available in selected locations."],
        ["Late returns may incur additional fees; contact us for details.", "There is a small penalty for late returns."],
        ["Yes, you can add multiple drivers for an additional fee.", "Please register additional drivers when renting."],
        ["We provide accessories like helmets, GPS, and child seats.", "You can rent accessories along with vehicles."],
        ["Chúng tôi có xe đạp, xe máy và ô tô cho thuê.", "Phương tiện đa dạng, phù hợp với mọi nhu cầu di chuyển."],
        ["Có, chúng tôi cung cấp xe điện và các loại phương tiện thân thiện với môi trường.", "Xe tay ga và xe điện sẵn sàng phục vụ bạn."],
        ["Nếu trả trễ, bạn sẽ chịu phí phạt nhỏ theo hợp đồng.", "Vui lòng thông báo nếu bạn cần thêm thời gian trả xe."],
        ["Bạn có thể đăng ký thêm người lái với một khoản phí nhỏ.", "Chỉ cần cung cấp thông tin người lái bổ sung là được!"],
        ["Chúng tôi cung cấp nón bảo hiểm, GPS và ghế trẻ em kèm theo xe.", "Phụ kiện đi kèm có thể được thuê thêm nếu cần."],

        // Phản hồi chung
        ["You can book rentals directly on our website or app.", "Online booking is available 24/7."],
        ["A security deposit is required; the amount depends on the item.", "Deposits are refunded within 7 days of return."],
        ["All costs are clearly mentioned in our pricing details.", "No hidden fees! Taxes are included in the price."],
        ["Check our website for ongoing promotions and discounts.", "Long-term rentals often come with discounts!"],
        ["We are open 7 days a week, including holidays.", "Yes, rentals are available during weekends and holidays."],
        ["Bạn có thể đặt thuê qua website hoặc ứng dụng của chúng tôi.", "Hệ thống đặt online của chúng tôi hoạt động 24/7."],
        ["Có yêu cầu đặt cọc, mức đặt cọc phụ thuộc vào loại sản phẩm.", "Tiền cọc sẽ được hoàn trả trong vòng 7 ngày sau khi trả đồ."],
        ["Chúng tôi không có phí ẩn, mọi chi phí được liệt kê rõ ràng.", "Giá đã bao gồm thuế, không lo phát sinh."],
        ["Hiện đang có chương trình giảm giá cho thuê dài hạn, tham khảo thêm trên website.", "Khuyến mãi đặc biệt đang chờ bạn!"],
        ["Chúng tôi làm việc cả cuối tuần và ngày lễ.", "Giờ hoạt động linh hoạt, phục vụ nhu cầu của bạn."],

        ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
        ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
        ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
        ["I am infinite"],
        ["I am just a bot", "I am a bot. What are you?"],
        ["The one true God, JavaScript"],
        ["I am nameless", "I don't have a name"],
        ["I love you too", "Me too"],
        ["Have you ever felt bad?", "Glad to hear it"],
        ["Why?", "Why? You shouldn't!", "Try watching TV"],
        ["What about?", "Once upon a time..."],
        ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
        ["Bye", "Goodbye", "See you later"],
        ["Sushi", "Pizza"],
        ["Bro!"],
        ["Great question"],
        ["That's ok", "I understand", "What do you want to talk about?"],
        ["Please say something :("],
        ["Haha!", "Good one!"],
        ["Heads", "Tails"],
        ["You can buy me a coffee at: <a href='https://www.facebook.com/PhuNguyen192002/' target='_blank' style='text-decoration:underline;'>https://www.facebook.com/PhuNguyen192002/</a>"]
    ];

    const alternative: string[] = ["Same", "Go on...", "Bro...", "Try again", "I'm listening...", "I don't understand :/"];
    const coronavirus: string[] = ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"];

    const compare = (promptsArray: string[][], repliesArray: string[][], input: string): string | null => {
        for (let i = 0; i < promptsArray.length; i++) {
            for (let j = 0; j < promptsArray[i].length; j++) {
                if (promptsArray[i][j] === input) {
                    const replies = repliesArray[i];
                    return replies[Math.floor(Math.random() * replies.length)];
                }
            }
        }
        return null;
    };

    const handleInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter' && inputRef.current) {
            const userInput = inputRef.current.value.trim().toLowerCase();
            if (userInput) {
                addChat(userInput);
                inputRef.current.value = ''; // clear input after sending
            }
        }
    };

    const addChat = (input: string): void => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { from: 'user', text: input }
        ]);

        setBotTyping(true);
        setTimeout(() => {
            const response = getBotResponse(input);
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: 'bot', text: response }
            ]);
            setBotTyping(false);
        }, 1000);
    };

    const getBotResponse = (input: string): string => {
        let response = compare(prompts, replies, input);
        if (response) {
            return response;
        } else if (input.match(/thank/gi)) {
            return "You're welcome!";
        } else if (input.match(/(corona|covid|virus)/gi)) {
            return coronavirus[Math.floor(Math.random() * coronavirus.length)];
        } else {
            return alternative[Math.floor(Math.random() * alternative.length)];
        }
    };

    return (
        <div className="relative">
           
            <div className='w-36'>
                <button
                    className="fixed bottom-4 right-20 p-3 bg-[#00939f] text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300 z-50"
                    onClick={() => setIsChatVisible(!isChatVisible)}
                >
                    <TbMessageCircle className='text-4xl' />
                </button>
            </div>

           
            {isChatVisible && (
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[80vh] bg-white w-1/3 fixed bottom-0 right-0 shadow-lg z-50 mb-24 rounded-lg mr-20">
                    <div className="flex items-center space-x-2 p-3 border-b-2 border-gray-200 justify-between">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center">
                                <span className="text-white text-xl">FU</span>
                            </div>
                            <div className="ml-2">
                                <h2 className="font-bold">FOO</h2>
                                <p className="text-sm text-gray-500">E-Neighbor Chatbot</p>
                            </div>
                        </div>
                        <button className="ml-auto text-gray-500 hover:text-black" onClick={() => setIsChatVisible(false)}>
                            <IoCloseOutline className='text-2xl'/>
                        </button>
                    </div>

                    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-end ${message.from === 'bot' ? '' : 'justify-end'}`}>
                                <div className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${message.from === 'bot' ? 'order-2 items-start' : 'order-1 items-end'}`}>
                                    <div>
                                        <span className={`px-4 py-3 rounded-xl inline-block ${message.from === 'bot' ? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-blue-500 text-white'}`} dangerouslySetInnerHTML={{ __html: message.text }}></span>
                                    </div>
                                </div>
                                <img src={message.from === 'bot' ? 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png' : 'https://i.pravatar.cc/100?img=7'} alt="" className="w-6 h-6 rounded-full" />
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                        {botTyping && (
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                                    <div><img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." className="w-16 ml-6" /></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <input
                                type="text"
                                placeholder="Say something..."
                                autoComplete="off"
                                autoFocus
                                ref={inputRef}
                                className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"
                                onKeyDown={handleInput}
                            />
                            <div className="absolute right-2 items-center inset-y-0 flex">
                                <button onClick={() => { if (inputRef.current) { addChat(inputRef.current.value); inputRef.current.value = ''; } }} className="focus:outline-none">
                                    <BsArrowRightCircleFill className='text-3xl text-[#00939f]' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
