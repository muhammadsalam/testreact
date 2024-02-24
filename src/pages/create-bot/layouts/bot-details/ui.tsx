import { Route, Routes } from "react-router-dom";
// import { BotDetailsLayout } from "./layouts";
import { Link } from "react-router-dom";

export const BotDetailsPage = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Link to="/createbot/step6/">DETAILS</Link> <br />
                        <Link to="/createbot/step6/IO">INSURANCE GRID</Link>
                        <br />
                        <Link to="/createbot/step6/P">PROFIT GRID</Link>
                    </>
                }
            />
            <Route
                path="/IO"
                element={
                    <>
                        <Link to="/createbot/step6/">DETAILS</Link> <br />
                        <Link to="/createbot/step6/IO">
                            INSURANCE GRID
                        </Link>{" "}
                        <br />
                        <Link to="/createbot/step6/P">PROFIT GRID</Link> <br />
                    </>
                }
            />
            <Route
                path="/P"
                element={
                    <>
                        <Link to="/createbot/step6/">DETAILS</Link> <br />
                        <Link to="/createbot/step6/IO">
                            INSURANCE GRID
                        </Link>{" "}
                        <br />
                        <Link to="/createbot/step6/P">PROFIT GRID</Link> <br />
                    </>
                }
            />
        </Routes>
    );
};
