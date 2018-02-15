function view(id){
	"use strict";
	
	jQuery.ajax({
			url:  domain+"product-management/Warranties/getWarrantiesData",
			dataType: "json",
			type: "POST",
			data: {
					'id' : id
				  },
			beforeSend: loadingShow('#form_warranties'),
			success: function(data) {
										sessOut(data);
										if(data.count){
											jQuery('#id').val(data.id);
											jQuery('#name').val(data.name);
											jQuery('#description').val(data.description);
											jQuery('#display').val(data.display);
											jQuery('#update_by').html(data.update_by);
											jQuery('#update_time').html(data.update_time);
												
											if(data.status) {
												jQuery('#status').attr('checked', 'checked');
											} else 
												jQuery('#status').attr('checked');
																							
											bootstrapSwitch('status', data.status);
										} else {
											
										}
										loadingHide('#form_warranties');
									}
		   });	
}

function save(){
	var id = jQuery('#id').val(),
		name = jQuery('#name').val(),
		description = jQuery('#description').val(),
		display = jQuery('#display').val(),
		status = jQuery('#status').is(':checked') ? 1 : 0;
	
	var form = $('#form_warranties');
	var error = $('.alert-error-save', form);
    var success = $('.alert-success-save', form);
		
	jQuery.ajax({
			url:  domain+"product-management/warranties/saveWarranties",
			dataType: "json",
			type: "POST",
			data: {
					'id' : id,
					'name' : name,
					'description' : description,
					'display' : display,
					'status' : status
				  },
			beforeSend: loadingShow('#form_warranties'),
			success: function(data) {
										sessOut(data);
										if(data.success){
                    						error.hide();
                    						UIToastr.showToaster("success", data.title, data.message);	
                    						$('#datatable').DataTable().ajax.reload();
											clearForm();
											jQuery(".btn-close-modal").trigger("click");
										} else {
											UIToastr.showToaster("error", data.title, data.message);
										}
										loadingHide('#form_warranties')
									}
		   });	
}

function clearSearchForm(){
	jQuery('#search_code').val('');
	jQuery('#search_name').val('');
	jQuery('#search_description').val('');
	jQuery('#search_status').val('');
}

function clearForm(){
	jQuery('#id').val('');	
	jQuery('#name').val('');	
	jQuery('#description').val('');	
	jQuery('#display').val('');	
	
	jQuery('#status').prop('checked', false);
	
	bootstrapSwitch('status', false);
}
