import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useToast } from '../context/ToastContext';

export const CandidateCard = ({ candidate }) => {
    const [loading, setLoading] = useState(false);
    const [voted, setVoted] = useState(candidate.has_voted);
    const { showToast } = useToast();

    const handleVote = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/votes', {
                target_user_id: candidate.id,
            });
            setVoted(true);
            showToast('Your vote has been successfully recorded.', 'success');
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to vote.', 'danger');
        } finally {
            setLoading(false);
        }
    };

    const photoUrl = candidate.profile_photo
        ? `${import.meta.env.VITE_API_URL}${candidate.profile_photo}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=0d6efd&color=fff&size=128`;

    return (
        <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 bg-light shadow-sm border-0 text-center">
                <div className="card-body d-flex flex-column align-items-center py-4">
                    <img
                        src={photoUrl}
                        alt={candidate.name}
                        className="rounded-circle mb-3"
                        width="100"
                        height="100"
                        style={{ objectFit: 'cover' }}
                    />
                    <h5 className="card-title fw-bold mb-3">{candidate.name}</h5>
                    <button
                        className={`btn ${voted ? 'btn-success' : 'btn-primary'} px-4 mt-auto`}
                        onClick={handleVote}
                        disabled={loading || voted}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Voting...
                            </>
                        ) : voted ? (
                            'Voted ✓'
                        ) : (
                            'Vote'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};