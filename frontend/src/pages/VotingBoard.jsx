import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { CandidateCard } from "../components/CandidateCard";

export const VotingBoard = () => {

    const [candidates, setCandidates] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchCandidates = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/users?page=${page}`);
            setCandidates(response.data.data);
            setPagination(response.data);
            setCurrentPage(response.data.current_page);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handlePageChange = (page) => {
        if (page && page !== currentPage) {
            fetchCandidates(page);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="alert alert-light mt-5 text-center" role="alert">
                    Vote for your favorite candidate, you can only vote once for each candidate.
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            {candidates.map((candidate) => (
                                <CandidateCard key={candidate.id} candidate={candidate} />
                            ))}
                        </div>

                        {pagination.last_page > 1 && (
                            <nav aria-label="Candidates pagination" className="mt-4">
                                <ul className="pagination justify-content-center">
                                    {pagination.links?.map((link, index) => (
                                        <li key={index} className={`page-item ${link.active ? 'active' : ''} ${!link.page ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(link.page)}
                                                disabled={!link.page || link.active}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
        </>
    );
};