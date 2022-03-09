import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../../config";
import { AppContext } from "../../App";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultImg from "../../assets/img/not-found.png";
import AddComment from "../comments/AddComment";
import Comments from "../comments/Comments";
axios.defaults.withCredentials = true;
const Book = () => {
  const [book, setBook] = useState();
  const { isbn } = useParams();
  const { loading, setLoading } = useContext(AppContext);
  const [status, setStatus] = useState([]);
  const [statusSelected, setStatusSelected] = useState("");
  const [comments, setComments] = useState([]);

  const fetchBook = async (isbn) => {
    setLoading(true);
    const res = await axios.get(`${URL}book/${isbn}`);
    setBook(res.data.book);
    setLoading(false);
  };
  const fetchStatus = async () => {
    setLoading(true);
    const res = await axios.get(`${URL}status`);
    setStatus(res.data.status);
    setLoading(false);
  };

  const updateStatus = async () => {
    if (statusSelected) {
      const res = await axios.post(`${URL}my-books`, { isbn, statusSelected });
    }
  };

  const getComments = async (isbn, URL, setLoading) => {
    setLoading(true);
    const res = await axios.get(`${URL}comment/${isbn}`);
    setComments(res.data.comments);
    setLoading(false);
  };
  const fetchMyBooksList = async () => {
    setLoading(true);
    const res = await axios.get(`${URL}my-books/${isbn}`);
    setStatusSelected(res.data.status_id);
  };

  useEffect(() => {
    getComments(isbn, URL, setLoading);
  }, []);

  useEffect(() => {
    fetchBook(isbn);
    fetchStatus();
    fetchMyBooksList();
  }, []);

  useEffect(() => {
    updateStatus();
  }, [statusSelected]);

  if (!book || loading) return <div>adsfsdfasdf</div>;

  return (
    <div style={{ marginTop: "90px" }} className="container">
      <div className="row">
        <div className="col-3">
          <img
            onError={(e) => (e.target.src = defaultImg)}
            src={`${URL}books/${book.filename}`}
            alt=""
            style={{
              width: "220px",
              height: "200px",
              maxHeight: "235px",
              maxWidth: "230px",
            }}
          />
          <h5 style={{ margin: "18px 0" }}>{book.no_pages} Pages</h5>
          <Form.Group className="mb-3 col-xl-8 col-md-4 col-sm-6 col-4">
            <Form.Select
              type="text"
              placeholder="Select category"
              value={statusSelected}
              onChange={(e) => setStatusSelected(e.target.value)}
            >
              <option value="">Add to my list</option>

              {status.map(({ status, status_id }) => (
                <option key={status_id} value={status_id}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-9">
          <h1>{book.title}</h1>
          <span>{book.synopsis}</span>
        </div>
      </div>
      <AddComment
        setComments={setComments}
        comments={comments}
        getComments={getComments}
      />
      <Comments comments={comments} />
    </div>
  );
};

export default Book;
