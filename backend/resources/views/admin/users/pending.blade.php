@extends('admin.layouts.app')

{{-- Customize layout sections --}}

@section('subtitle', 'Welcome')
@section('content_header_title', 'Users')
@section('content_header_subtitle', 'Pending Requests')

{{-- Content body: main page content --}}

@section('content_body')
    <div class="card">
        <div class="card-body p-0">
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($users as $user)
                    <tr>
                        <td>{{ $users->firstItem() + $loop->index }}</td>
                        <td>
                            <img 
                                src="{{ asset($user->profile_photo) }}"
                                alt="{{ $user->name }}'s profile photo"
                                class="img-circle"
                                width="100"
                            >
                        </td>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td class="d-flex">
                            <x-adminlte-button label="Approve" 
                                                data-toggle="modal" 
                                                data-target="#approve" 
                                                class="bg-success btn-approve"
                                                data-id="{{ $user->id }}"
                             />

                            <x-adminlte-button  label="Reject" 
                                                data-toggle="modal" 
                                                data-target="#reject" 
                                                class="bg-danger btn-reject"
                                                data-id="{{ $user->id }}"
                            />
                            
                        </td>
                    </tr>
                     @empty
                        <tr class="">
                            <td colspan="4" class="text-center">No pending users found.</td>
                        </tr>
                    
                @endforelse
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

    <x-adminlte-modal id="approve" title="Approve User" size="md" theme="teal"
         v-centered static-backdrop>
        <div > Are you sure you want to approve this user? </div>
        <x-slot name="footerSlot">
            <form id="approveForm" action="#" method="POST">
                @csrf
                <x-adminlte-button label="Approve" theme="success" type="submit" class="mr-2"/>
            </form>
            <x-adminlte-button theme="danger" label="Dismiss" data-dismiss="modal"/>
        </x-slot>
    </x-adminlte-modal>

    <x-adminlte-modal id="reject" title="Reject User" size="md" theme="teal"
         v-centered static-backdrop>
        <div > Are you sure you want to reject this user? </div>
        <x-slot name="footerSlot">
            <form id="rejectForm" action="#" method="POST">
                @csrf
                <x-adminlte-button label="Reject" theme="warning" type="submit" class="mr-2"/>
            </form>
            <x-adminlte-button theme="danger" label="Dismiss" data-dismiss="modal"/>
        </x-slot>
    </x-adminlte-modal>
   
@stop

{{-- Push extra CSS --}}

@push('css')
    {{-- Add here extra stylesheets --}}
    {{-- <link rel="stylesheet" href="/css/admin_custom.css"> --}}
@endpush

{{-- Push extra scripts --}}

@push('js')
<script>
    document.querySelectorAll('.btn-approve').forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.dataset.id;
            document.getElementById('approveForm').action = `{{ url('admin/users') }}/${userId}/approve`;
        });
    });

    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.dataset.id;
            document.getElementById('rejectForm').action = `{{ url('admin/users') }}/${userId}/reject`;
        });
    });
</script>
@endpush