import Form from "./../components/Form";
import CardContainer from "./../components/CardContainer";
import Navbar from "../components/Navbar";
import { useState } from "react";
const HomePage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    return (
        <div>
            <Navbar />
            <div className="flex p-5">
                <CardContainer
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
                <Form pageNumber={pageNumber} />
            </div>
        </div>
    );
};

export default HomePage;
