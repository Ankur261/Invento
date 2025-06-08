package com.cdac.invento.custom_exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resourceName, String fieldName, Long fieldValue) {
        super(resourceName + " not found with " + fieldName + " : " + fieldValue);
    }
}
