@extends('admin.layouts.app')

{{-- Customize layout sections --}}

@section('subtitle', 'Welcome')
@section('content_header_title', 'Users')
@section('content_header_subtitle', 'All users')

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
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
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
                            <td>
                                @if($user->status == \App\Enums\UserStatus::APPROVED->value)
                                    <span class="badge badge-success">Approved</span>
                                @elseif($user->status == \App\Enums\UserStatus::REJECTED->value)
                                    <span class="badge badge-danger">Rejected</span>
                                @else
                                    <span class="badge badge-warning">Pending</span>
                                @endif
                            </td>
                            <td class="d-flex">
                                @if($user->status == \App\Enums\UserStatus::APPROVED->value)
                                    <x-adminlte-button label="Approve" 
                                                        data-toggle="modal" 
                                                        data-target="#approve" 
                                                        class="bg-success btn-approve"
                                                        data-id="{{ $user->id }}"
                                                        disabled
                                    />
                                @else
                                    <x-adminlte-button label="Approve" 
                                                        data-toggle="modal" 
                                                        data-target="#approve" 
                                                        class="bg-success btn-approve"
                                                        data-id="{{ $user->id }}"
                                                        
                                    />
                                @endif

                                @if($user->status == \App\Enums\UserStatus::REJECTED->value)
                                    <x-adminlte-button  label="Reject" 
                                                        data-toggle="modal" 
                                                        data-target="#reject" 
                                                        class="bg-danger btn-reject"
                                                        data-id="{{ $user->id }}"
                                                        disabled
                                    />
                                @else
                                    <x-adminlte-button  label="Reject" 
                                                        data-toggle="modal" 
                                                        data-target="#reject" 
                                                        class="bg-danger btn-reject"
                                                        data-id="{{ $user->id }}"
                                    />
                                @endif
                                
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