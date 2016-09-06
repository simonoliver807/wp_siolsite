<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
    'div_id' => array(
        'type'  => 'text',
        'label' => __('Div ID', '{FW}'),
        'desc'  => __('Please input Div ID', '{FW}')
    ),
    'div_class' => array(
        'type'  => 'text',
        'label' => __('Div Class', '{FW}'),
        'desc'  => __('Please input Div Class', '{FW}')
    )
);