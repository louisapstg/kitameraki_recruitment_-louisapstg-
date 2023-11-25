import Form from "./../components/Form";
import CardContainer from "./../components/CardContainer";
import Navbar from "../components/Navbar";
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex p-5">
                <Form />
                <CardContainer />
            </div>
        </div>
    );
};

export default HomePage;
