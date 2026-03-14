<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVote extends Model
{
    //
    protected $fillable = [
        'voter_id',
        'target_user_id'
    ];

    public function voter()
    {
        return $this->belongsTo(User::class, 'voter_id');
    }

    public function targetUser()
    {
        return $this->belongsTo(User::class, 'target_user_id');
    }
}
