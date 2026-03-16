@extends('admin.layouts.app')

{{-- Customize layout sections --}}

@section('subtitle', 'Welcome')
@section('content_header_title', 'Dashboard')
@section('content_header_subtitle', 'Welcome')

{{-- Content body: main page content --}}

@section('content_body')
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Voting leaderboard</h3>
        </div>
        <div class="card-body p-0">
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total received votes</th>
                <th>Image</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td>{{ $users->firstItem() + $loop->index }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user['votes_received_count'] }}</td>
                        <td>
                            <img 
                                src="{{ asset($user->profile_photo) }}"
                                alt="{{ $user->name }}'s profile photo"
                                class="img-circle"
                                width="100"
                            >
                        </td>
                    </tr> 
                @endforeach
            </tbody>
            </table>
        </div>

        @if ($users->hasPages())
            <div class="card-footer clearfix">
                <div class="float-right">
                    {{ $users->links() }}
                </div>
            </div>
        @endif
    </div>

@stop

{{-- Push extra CSS --}}

@push('css')
    {{-- Add here extra stylesheets --}}
    {{-- <link rel="stylesheet" href="/css/admin_custom.css"> --}}
@endpush

{{-- Push extra scripts --}}

@push('js')
    
@endpush